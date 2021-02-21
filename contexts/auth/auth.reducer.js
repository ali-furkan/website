import { ACTION } from "./auth.constants";

export const authReducer = (prevState, a) => {
	switch (a.type) {
		case ACTION.SIGN_IN:
			return {
				...prevState,
				isSigned: true,
			};
		case ACTION.SIGN_OUT:
			return {
				isSigned: false,
			};
	}
};
