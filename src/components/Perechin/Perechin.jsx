import React, {useCallback, useEffect, useState} from 'react';
import './Perechin.css';
import moment from 'moment';
import { useTelegram } from "../../hooks/useTelegram";
import { Form } from "react-bootstrap";

const Perechin = () => {
    const [dob, setDob] = useState(new Date().toISOString().substr(0, 10));
    const [formset, setFormset] = useState('');
    const [court, setCourt] = useState('');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = { dob, formset, court }
        tg.sendData(JSON.stringify(data));
    }, [dob, formset, court])


    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {tg.offEvent('mainButtonClicked', onSendData)}
    }, [onSendData])


    useEffect(() => {
        tg.MainButton.setParams({text: 'Пошук'})
        tg.MainButton.show();
    }, [])


    const onChangeDate = (e) => {
        setDob(e.target.value)
    }


    const onChangeFormset = (e) => {
        setFormset(e.target.value)
    }


    const onChangeCourt = (e) => {
        setCourt(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <>
                <br />
                <Form.Control size="lg" as="select" value={court} onChange={onChangeCourt} className={'select'}>
                    <option value="Склад суду">Склад суду</option>
                    <option value="Ганько І.І.">Ганько І.І.</option>
                    <option value="Гевці В.М.">Гевці В.М.</option>
                    <option value="Чепурнов В.О.">Чепурнов В.О.</option>
                </Form.Control>
                <br />
                <Form.Control size="lg" as="select" value={formset} onChange={onChangeFormset} className={'select'}>
                    <option value="Форма судочинства">Форма судочинства</option>
                    <option value="Адміністративні правопорушення">Адміністративні правопорушення</option>
                    <option value="Кримінальне судочинство">Кримінальне судочинство</option>
                    <option value="Цивільне судочинство">Цивільне судочинство</option>
                </Form.Control>
                <br />
                <br />
                <Form.Control size="lg" type="date" name="dob" placeholder="Date of Birth" value={dob} onChange={onChangeDate} />
                <br />
                
            </>    
               
          
        </div>
    );
};

export default Perechin;