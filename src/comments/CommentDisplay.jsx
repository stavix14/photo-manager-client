import React from 'react';
import { Comment } from 'semantic-ui-react';

const CardInput = ({username, comment}) => 
    (<Comment>
      <Comment.Content>
        <Comment.Author as='a'>{username}</Comment.Author>
        <Comment.Text>{comment}</Comment.Text>
      </Comment.Content>
    </Comment>);

export default CardInput;