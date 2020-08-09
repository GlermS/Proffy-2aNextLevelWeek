import React from 'react';
import "./style.css"
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem/TeacherItem';
import Input from '../../components/Input'

function TeacherList() {
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis" >
                <form id="search-teachers">
                    <Input name="subject" label="Matéria" type="text" />
                    <Input name="week-day" label="Dia da semana" type="text" />
                    <Input name="time" label="Horário" type="time" />
            </form>
            </PageHeader>

            <main>
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
            </main>
        </div>
        )
}

export default TeacherList;