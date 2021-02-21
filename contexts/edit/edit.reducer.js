import { ACTION } from "./edit.constants";

export const EditReducer = (prevState, action) => {
	switch (action.type) {
		case ACTION.SET_ALL: {
			const payload = {
				type: action.value?.type || prevState.type,
				title: action.value?.title || prevState.title,
				description: action.value?.description || prevState.description,
				content: action.value?.content || prevState.content,
				tags: action.value?.tags || prevState.tags,
				image: action.value?.image || prevState.image,
			};
			return {
				...payload,
				prevData: payload,
			};
		}
		case ACTION.CHANGE_TITLE:
			return {
				...prevState,
				title: action.value,
			};
		case ACTION.CHANGE_DESCRIPTION:
			return {
				...prevState,
				description: action.value,
			};
		case ACTION.CHANGE_CONTENT:
			return {
				...prevState,
				content: action.value,
			};
		case ACTION.CHANGE_TAGS:
			return {
				...prevState,
				tags: action.value,
			};
		case ACTION.CHANGE_IMAGE:
			return {
				...prevState,
				image: action.value,
			};
	}
};
