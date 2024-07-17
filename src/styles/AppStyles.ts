import { styled } from '@mui/material/styles';
import { StyledComponent } from '@emotion/styled';

export const AppStyled: StyledComponent<'div', any, {}> = styled('div')({
    padding: 0,
    margin: '4em auto',

    display: 'flex',
    width: '60%'
});

export const ContainerStyled: StyledComponent<'div', any, {}> = styled('div')({
    marginLeft: '3em',
    marginRight: '3em',

    width: '100%'
});
