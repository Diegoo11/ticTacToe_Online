import { gql } from '@apollo/client';

export const played = gql`
mutation($play: Int!, $gameId: String!) {
  played(play: $play, gameId: $gameId) {
    id
    p_0
    p_1
    p_2
    p_3
    p_4
    p_5
    p_7
    p_8
    status
    winner
  }
}
`;

export const resetTable = gql`
mutation($gameId: String!) {
  resetTable(gameId: $gameId) {
    p_0
  }
}
`;

export const LOGIN = gql`
mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`;

export const REGISTER = gql`
mutation($username: String!, $password: String!) {
  register(username: $username, password: $password) {
    value
  }
}
`;

export const CREATEGAME = gql`
mutation {
  createGame {
    value
  }
}
`;

export const JOINGAME = gql`
mutation($gameId: String!) {
  joinGame(gameId: $gameId) {
    value
  }
}
`;
