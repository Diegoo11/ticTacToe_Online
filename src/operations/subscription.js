import { gql } from '@apollo/client';

export const playerPlayed = gql`
subscription($gameId: String!) {
  playerPlayed(id: $gameId) {
    id
  }
}
`;
