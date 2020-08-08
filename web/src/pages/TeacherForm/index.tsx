import React from 'react';
import PageHeader from '../../components/PageHeader';
import "./style.css"

import Input from '../../components/Input'



function TeacherForm() {
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que bom que você quer da aulas!"
                description = "Preencha o formulário para começar"
            />

            <main>
                <fieldset>
                    <legend> Seus dados</legend>

                    <Input name="Name" label="Nome Completo" type ="text"/>

                    <div className="input-block">
                        <label htmlFor="avatar">Avatar</label>
                        <input type="text" id="avatr" />
                    </div>

                    <div className="input-block">
                        <label htmlFor="whatsapp">Whatsapp</label>
                        <input type="text" id="whatsapp" />
                    </div>
                </fieldset>
            </main>
        </div>
    );
}

export default TeacherForm;