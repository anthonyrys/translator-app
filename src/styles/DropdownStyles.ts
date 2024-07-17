import { Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledComponent } from '@emotion/styled';

export const DropdownStyled: StyledComponent<typeof Autocomplete, any, {}> = styled(Autocomplete)({
    marginBottom: '1em',
    width: '60%'
});
