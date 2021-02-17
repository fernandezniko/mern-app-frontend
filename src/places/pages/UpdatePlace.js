import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook';
import Input from '../../shared/components/formElements/Input'
import Button from '../../shared/components/formElements/Button'
import Card from '../../shared/components/UIElements/Card'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import './PlaceForm.css'
import { AuthContext } from '../../shared/context/Auth-context';

const UpdatePlace = () => {

    const auth = useContext(AuthContext);
    const { isLoading, error, clearError, sendRequest } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const placeId = useParams().placeId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false)

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
                )
                setLoadedPlace(responseData.place);
                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true
                        }

                    }, true)
            } catch (err) {

            }
        }

        fetchPlaces();
    }, [sendRequest, placeId, setFormData])


    const placeUpdateSubmitHandler = async event => {
        event.preventDefault()

        try {

            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            )

            history.push('/' + auth.userId + '/places');
        } catch (err) {

        }
    }


    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>)
    }

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not finde place</h2>
                </Card>
            </div>)
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                    initialValue={loadedPlace.title}
                    initialValid={true} />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (min. 5 characteres)."
                    onInput={inputHandler}
                    initialValue={loadedPlace.description}
                    initialValid={true} />
                <Button type="submit" disabled={!formState.isValid} >
                    UPDATE PLACE
            </Button>
            </form>}
        </React.Fragment>
    )
}

export default UpdatePlace  