import React from 'react';
import PropTypes from 'prop-types';
import { Card, Comment, Header, Icon, Image, Rating } from 'semantic-ui-react';
import Chip from "../miscellaneous/Chip";
import CommentDisplay from "../comments/CommentDisplay";
import CommentInput from "../comments/CommentInput";
import ratingCalculation from "../utils/utils";

const CardDisplay = ({ id, data, inputData, errors, onSubmit, onChange, onRate }) => (
  <Card centered>
    {/* put the link in a env file */}
    <Image src={`http://localhost:8080/uploads/${data.imageName}`} wrapped ui={false} />
    <Card.Content extra>
      <span>
        <Icon name='point' />
        {data.location}
      </span>
      <Rating rating={data.rating.length ? ratingCalculation(data.rating) : 0} maxRating={5} disabled />
    </Card.Content>
    <Card.Content>
      <Card.Header>{data.username}</Card.Header>
      <Card.Meta>
        <span className='date'>{data.date}</span>
      </Card.Meta>
      <Card.Description>
        {data.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        {data.tags.map((tag, index) => <Chip key={index} tag={tag} /> )}
    </Card.Content>
    <Comment.Group>
        <Header as='h3' dividing>
            Comments
        </Header>
        {data.comments.map((commentPost, index) => <CommentDisplay key={index} username={commentPost[0]} comment={commentPost[1]} />)}
    <CommentInput
        id={id} 
        onChange={onChange} 
        onRate={onRate} 
        onSubmit={onSubmit}
        inputData={inputData}
        errors={errors}
    />
    </Comment.Group>
  </Card>
)

CardDisplay.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  inputData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired
}

export default CardDisplay;