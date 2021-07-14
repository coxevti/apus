import styled from 'styled-components'

export const Wrapper = styled.table`
    border-spacing: 1;
    border-collapse: separate;
    border-spacing: 0em 0.4em;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;
    margin: 2rem 0rem 10rem 0rem;
    td,
    tr {
        text-align: left;
        font-weight: 500;
    }
    th.ascending::after {
        content: '⬇';
        display: inline-block;
        margin-left: 1em;
    }
    th.descending::after {
        content: '⬆';
        display: inline-block;
        margin-left: 1em;
    }
    thead {
        tr {
            height: 30px;
            text-transform: uppercase;
            th {
                padding: 20px;
                color: #a9b2c8;
            }
        }
    }
    tbody {
        tr {
            background: white;
            td {
                padding: 10px 20px;
                &:first-child {
                    border-bottom-left-radius: 5px;
                    border-top-left-radius: 5px;
                }
                &:last-child {
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    text-align: center;
                }
                button {
                    display: inline-block;
                    &:first-child {
                        margin-right: 5px;
                    }
                    padding: 5px 8px;
                    border-radius: 4px;
                }
                .btn-destroy {
                    background: #ff4c4c;
                }
                .btn-edit {
                    background: #00bce4;
                }
            }
        }
    }
`
