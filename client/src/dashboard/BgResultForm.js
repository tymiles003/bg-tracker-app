//@flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addResult } from './../actions/actions_bgData';

import './BgResultForm.css'

import type { FieldProps, FormProps } from 'redux-form';

type Values = { glucose: number };

type Props = { 
    addResult: Function, 
    closeForm: Function, 
    history: any
} & FormProps;

class BgResultForm extends Component<any, Props, any> {
    props: Props

    renderField(field) {
        const { meta: { touched, error } }: FieldProps = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                type={field.type}
                className="form-control"
                {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values: Values) {
        this.props.addResult(values);
        this.props.history.push('/');
        this.props.closeForm();
    }

    render() {
        let { closeForm, handleSubmit } = this.props;
        return (
            <div className="card margin-card">
                <div className="card-header">
                    Add BG Reading
                </div>
                <div className="card-block">
                    <div className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8">
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                                <Field
                                name="glucose"
                                label="Glucose Level"
                                type="number"
                                placeholder="Enter a Blood Glucose reading..."
                                component={this.renderField}>
                                </Field>
                                <button 
                                type="submit"
                                className="btn btn-primary pull-right margin-form-btn">
                                    Submit
                                </button>
                                <button onClick={closeForm} 
                                className="btn btn-danger pull-right margin-form-btn">
                                    Cancel
                                </button>
                            </form>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>
            </div>
        );
    };
}

function validate(values: Values) {
    const errors = {};

    if (!values.glucose) {
        errors.glucose = "Enter a Glucose reading.";
    }

    if (values.glucose < 1) {
        errors.glucose = "Glucose reading must be greater than zero.";
    }

    return errors;
}

const mapDispatchToProps = {
    addResult
};

export default BgResultForm = reduxForm({
    validate,
    form: 'BgResultForm'
})( connect(null, mapDispatchToProps)(BgResultForm) );