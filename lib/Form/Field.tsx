import React, { useContext, ReactNode } from 'react';
import classNames from 'classnames';
import { get } from 'lodash';

import Context from './Context';

export interface IFieldProps {
	className: string;
	name: string;
	pending: boolean;
	input?: React.ElementType;
	onChange?: (value: any) => void;
	children?: ReactNode;
}

function Field({
	input: Input = 'input',
	className,
	name,
	children,
	...props
}: IFieldProps) {
	const {
		values, isDirty, touched, errors, handleChange, handleBlur,
	} = useContext(Context);
	const value = get(values, name);

	const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetValue = e.target?.value !== undefined ? e.target?.value : e; // @TODO: getValue from other input types

		handleChange(name, targetValue);
		props.onChange && props.onChange(targetValue);
	};

	return (
		<div
			className={classNames('_Form__Field', {
				'_Form__Field--hasError': (!isDirty || touched[name]) && errors[name],
			}, className)}
		>
			<Input
				{...props}
				value={value}
				name={name}
				onChange={handleChangeInternal}
				onBlur={handleBlur}
			/>
			{children}
		</div>
	);
}

export default Field;