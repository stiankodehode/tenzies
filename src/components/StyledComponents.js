import styled from "styled-components";

export const StyledButton = styled.button.attrs((/* props */) => ({
    tabIndex: 0,
}))`
    padding: 1em;
    background-color: #5035ff;
    color: #ffffff;
    border-style: none;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        background-color: #3926a3;
    }
`;

export const StyledH1 = styled.h1`
    margin: 0;
    color: black;
`;

export const StyledParagraph = styled.p`
    color: #4a4e74;
`;

export const StyledDiv = styled.div`
    margin-top: 3em;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 4em;
`;
