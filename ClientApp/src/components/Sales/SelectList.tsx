import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { IClient, ISoft } from './../../Interface/MainTypes';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISelectProps {
    labelTitle: string,
    labelId: string,
    htmlId: string,
    value: string | undefined,
    items: Array<IClient | ISoft>,
    emptyLabel: string,
    handelChange(event: SelectChangeEvent): void,
    error: boolean
}

const SelectList = (props: ISelectProps) => {

    if (props.items.length === 0) {
        return (
            <>
                <FormControl fullWidth error={props.error} >
                    <InputLabel id={props.labelId} >{props.labelTitle}</InputLabel>
                    <Select
                        labelId={props.labelId}
                        id={props.htmlId}
                        value={props.value}
                        onChange={props.handelChange}
                        label={props.labelTitle}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>{props.emptyLabel}</MenuItem>
                    </Select>
                </FormControl>
            </>
        );
    }

    if (props.items.length > 0) {
        return (
            <FormControl fullWidth error={props.error}  >
                <InputLabel id={props.labelId} >{props.labelTitle}</InputLabel>
                <Select
                    labelId={props.labelId}
                    id={props.htmlId}
                    value={props.value}
                    onChange={props.handelChange}
                    displayEmpty
                    label={props.labelId}
                >
                    {
                        props.items.map((item) => (
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        );
    }

    return null;

}

export default SelectList;