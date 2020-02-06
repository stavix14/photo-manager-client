import React from 'react';
import PropTypes from 'prop-types';
import { Card, Comment, Header, Icon, Image, Rating } from 'semantic-ui-react';
import Chip from "../miscellaneous/Chip";
import CommentDisplay from "../comments/CommentDisplay";
import CommentInput from "../comments/CommentInput";
import { ratingCalculation } from "../utils/utils";

const CardDisplay = props => (
  <Card centered>
    {/* put the link in a env file */}
    <Image src={`http://localhost:8080/uploads/${props.imageName}`} wrapped ui={false} />
    <Card.Content extra>
      <span>
        <Icon name='point' />
        {props.location}
      </span>
      <Rating rating={props.ratings.length ? ratingCalculation(props.ratings) : 0} maxRating={5} disabled />
    </Card.Content>
    <Card.Content>
      <Card.Header>{props.username}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.date}</span>
      </Card.Meta>
      <Card.Description>
        {props.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        {props.tags.map((tag, index) => <Chip key={index} tag={tag} /> )}
    </Card.Content>
    <Comment.Group>
        <Header as='h3' dividing>
            Comments
        </Header>
        {props.comments.map((commentPost, index) => <CommentDisplay key={index} username={commentPost[0]} comment={commentPost[1]} />)}
    <CommentInput
        id={props.id} 
        onChange={props.onChange} 
        onRate={props.onRate} 
        onSubmit={props.onSubmit}
        inputData={props.inputData}
        errors={props.errors}
    />
    </Comment.Group>
  </Card>
)

CardDisplay.propTypes = {
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired
}

export default CardDisplay;