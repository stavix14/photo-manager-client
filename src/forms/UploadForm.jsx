import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Button } from 'semantic-ui-react';

const UploadForm = ({ formValues, errors, loading, submitSuccess, onChange, addTags, onImageSelect, onSubmit }) => {
    const { location, date, description } = formValues;

    return(
        <Form loading={loading}>
            {errors.global && (
                <Message 
                    negative
                    header="Something went wrong"
                    content={errors.global}
                />
            )}
            {submitSuccess && (
                <Message
                    positive
                    header="Your photo was posted!"
                    content="Go to feed page to check it out along all our library."
                />
            )}
            <Form.Input 
                type="text"
                name="location"
                label="Location"
                placeholder="Enter the place where the photo was taken"
                error={errors.location}
                value={location}
                onChange={onChange}
                required
            />
            <Form.Input 
                type="date"
                name="date"
                label="Date"
                error={errors.date}
                value={date}
                onChange={onChange}
                required
            />
            <Form.TextArea
                name="description" 
                label="Description" 
                placeholder='Insert your caption here...'
                error={errors.description}
                value={description}
                onChange={onChange}
                required
                maxLength={128}
                rows={3}
            />
            <p>{`${description.length} / 128`}</p>
            <Form.Input
                type="text"
                name="tags"
                label="Tags"
                placeholder="Press Space to add tags..."
                error={errors.tags}
                onKeyUp={addTags}
            />
            <Form.Input
                type="file"
                name="file"
                label="Upload image"
                accept="image/png, image/jpeg"
                multiple={false}
                error={errors.selectedImage}
                onChange={onImageSelect}
                required
            />
            <Button
                type="submit"
                content="Submit"
                labelPosition="left"
                icon="send"
                onClick={onSubmit}
            />
        </Form>
    );
}

UploadForm.propTypes = {
    formValues: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    submitSuccess: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    addTags: PropTypes.func.isRequired,
    onImageSelect: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default UploadForm;