import {gql, useQuery} from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GET_CHARACTERS {
      characters{
        results{
          id
          name
          image
        }
      }
    }
`;

export const GET_DETAIL_CHARACTER = gql`
  query GET_DETAIL_CHARACTER($id: ID!) {
      character(id: $id){
        id
        name
        status
        species
        type
        gender
        origin{
          id
          name
          type
        }
        location{
          id
          name
          type
        }
        image
        episode{
          id
          name
          air_date
          episode
        }
        created
      }
    }
`;