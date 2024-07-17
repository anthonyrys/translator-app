import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import { StyledComponent } from '@emotion/styled';

export const TextboxStyled: StyledComponent<typeof TextField, any, {}> = styled(TextField)({
    '& .MuiInputBase-root.Mui-disabled': {
        backgroundColor: 'rgb(1, 1, 1, 0.05)',
            
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(1, 1, 1, 0.05)',
        }
    }
});
