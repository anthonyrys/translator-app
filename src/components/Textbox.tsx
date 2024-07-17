import { TextboxStyled } from '../styles/TextboxStyles';

interface TextboxProps {
    text: string;
    onUpdate: {(newValue: string): void} | null;
}

export default function Textbox(props: TextboxProps): React.ReactElement {
    function onChange(event: any): void {
        if (props.onUpdate != null) {
            props.onUpdate(event.target.value);
        }
    }

    return (
        <TextboxStyled 
            disabled = { props.onUpdate != null ? false : true }
            value = { props.text }

            inputProps={{ maxLength: 100 }}
            onChange={ onChange }

            fullWidth
            multiline={ true }
            rows={ 10 }
        />
    );
}
