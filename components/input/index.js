import {
	StyledInputBox,
	StyledInputLabel,
	StyledInputWrapper,
	StyledInput
} from "./input.style"

function Input({
	label,
	placeholder,
	value,
	onChange,
	children,
	type,
	...props
}) {
	return (
		<StyledInputBox>
			{label && (
				<StyledInputLabel htmlFor={label ?? placeholder}>
					<p>{label}</p>
				</StyledInputLabel>
			)}
			<StyledInputWrapper>
				<StyledInput
					id={label}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					spellCheck="false"
					type={type}
					{...props}
				/>
				{children}
			</StyledInputWrapper>
		</StyledInputBox>
	)
}

export default Input
