import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 380px;

    @media(max-width: 520px) {
        display: none;
    }
`;
