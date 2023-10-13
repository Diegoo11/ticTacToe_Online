import { gql } from '@apollo/client';

export const getGame = gql`
query($gameId: String!){
  getTable(gameId: $gameId) {
    p_0
    p_1
    p_2
    p_3
    p_4
    p_5
    p_6
    p_7
    p_8
  }
  getEnemy(gameId: $gameId) {
    id
    username
    imgSrc
  }
}
`;

export const getTable = gql`
query($gameId: String!) {
  getTable(gameId: $gameId) {
    p_0
    p_1
    p_2
    p_3
    p_4
    p_5
    p_6
    p_7
    p_8
    winner
    status
  }
}
`;
export const getUser = gql`
query {
  getUser {
    id
    imgSrc
    username
  }
}
`;

export const getEnemy = gql`
query($gameId: String!){
  getEnemy(gameId: $gameId) {
    id
    username
    imgSrc
  }
}
`;
