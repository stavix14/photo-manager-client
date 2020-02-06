import React from 'react';
import { Button, Form, Rating } from 'semantic-ui-react';

const CommentInput = ({ id, onChange, onRate, onSubmit, inputData, errors}) => 
    <React.Fragment>
        <Form reply>
        <Form.TextArea
            name="comment" 
            label="Comment" 
            placeholder="Insert your comment here..."
            error={errors.id === id ? errors.comment : false}
            value={inputData.comment}
            onChange={onChange}
            maxLength={128}
        />
            <Button onClick={onSubmit} content='Add Reply' labelPosition='left' icon='edit' primary />
            <Rating
                name="rating"
                rating={inputData.rating} 
                maxRating={5} 
                clearable
                onRate={onRate}
            />
        </Form>
    </React.Fragment>;

export default CommentInput;