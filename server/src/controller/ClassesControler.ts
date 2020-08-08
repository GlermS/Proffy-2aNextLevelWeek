import db from './../database/connection';
import convertHourToMinute from './../utils/convertHourToMinutes';

import { Request, Response } from 'express';



interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}



export default class ClassesController {
    async index(request: Request, response: Response) {
        const filtersQuery = request.query;

        if (!filtersQuery.week_day || !filtersQuery.subject || !filtersQuery.time) {
            return response.status(400).json({
                error: "Undefined filter"
            });
        }

        const filters = {
            'week_day': filtersQuery.week_day as string,
            'subject': filtersQuery.subject as string,
            'time': convertHourToMinute(filtersQuery.time as string)
        };

        const classes = await db('classes')
            .whereExists(function(){
                this.select("class_schedules.*")
                    .from('class_schedules')
                    .whereRaw("`class_schedules`.`class_id`=`classes`.`id` ")
                    .whereRaw('`class_schedules`.`week_day`= ??', [Number(filters.week_day)])
                    .whereRaw('`class_schedules`.`from`<= ??', [filters.time])
                    .whereRaw('`class_schedules`.`to`> ??', [filters.time])
            })
            .where('classes.subject', filters.subject).join('users', 'classes.user_id', 'user_id').select(['classes.*', 'users.*']);
          

        return response.json(classes);

    }

    async create(request: Request, response: Response) {
        const { name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule } = request.body;

        const trx = await db.transaction();
        try {
            const insUsersIds = await trx('users').insert({
                name, avatar, whatsapp, bio
            });

            const user_id = insUsersIds[0];

            const insClassesId = await trx('classes').insert({
                subject, cost, user_id
            });
            console.log(name);

            const class_id = insClassesId[0];

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinute(scheduleItem.from),
                    to: convertHourToMinute(scheduleItem.to)
                };
            });


            await trx('class_schedules').insert(classSchedule);

            await trx.commit();

            return response.status(201).send({ name });
        } catch (err) {
            await trx.rollback();
            return response.status(400).send({
                error: "Unexpected Error while ..."
            }
            );
        }
    }
}