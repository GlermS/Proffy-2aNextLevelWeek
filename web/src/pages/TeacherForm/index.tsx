import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import "./style.css"

import Input from '../../components/Input'
import warning from '../../assets/images/icons/warning.svg'
import api from '../../services/api';


function Send() {
    api.post('classes', {
        "name": "Lauro",
        "avatar": "https://avatars2.githubusercontent.com/u/69318250?s=400&u=f6a47e68010fa313e99164f80e05c1de63570088&v=4",
        "whatsapp": "022999699151",
        "bio": "Hello! I'm a mechanical engineering student learning how to code.",
        "subject": "Portugues",
        "cost": 89,
        "schedule": [
            { "week_day": 1, "from": "8:00", "to": "12:00" },
            { "week_day": 3, "from": "9:00", "to": "16:00" },
            { "week_day": 3, "from": "16:00", "to": "22:00" }
        ]

    })
}

function TeacherForm() {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [schedule, setSchedule] = useState([
        { "week_day": 0, "from": "0:00", "to": "12:00" },
        { "week_day": 0, "from": "0:00", "to": "12:00" },
        { "week_day": 0, "from": "0:00", "to": "12:00" }
    ]
	);

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que bom que você quer da aulas!"
                description = "Preencha o formulário para começar"
            />

            <main>
                <fieldset>
                    <legend> Seus dados</legend>

                    <Input name="name" label="Nome Completo" type="text"
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />
                    <Input name="avatar" label="Avatar" type="text"
                        value={avatar}
                        onChange={(e) => { setAvatar(e.target.value) }} />
                    <Input name="whatsapp" label="Whatsapp" type="text"
                        value={whatsapp}
                        onChange={(e) => { setWhatsapp(e.target.value) }}
                     />
                    <Input name="bio" label="Descrição" type="text"
                        value={bio}
                        onChange={(e) => { setBio(e.target.value) }}
                     />

                </fieldset>
                <fieldset>
                    <legend> Dados da aula </legend>

                    <Input name="´subject" label="Matéria" type="text"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                      />
                    <Input name="cost" label="Preço/hora" type="number" min="0" step="0.01"
                        value={cost}
                        onChange={(e) => { setCost(e.target.value) }}
                      />
                    <Input name="schedule" label="Horários disponíveis" type="text" />

                </fieldset>

                <footer>
                    <p>
                        <img src={warning} />
                        Importante<br />
                        Preencha todos os dados

                    </p>
                    <button type="submit" className="send" onClick={Send}>
                        Salvar cadastro
                        </button>
                </footer>

            </main>
        </div>
    );
}

export default TeacherForm;