import { css } from '@emotion/core';

export const reset = css`
	* {
		margin: 0;
		padding: 0;
		font-size: inherit;
		font-weight: inherit;
		line-height: 1;
	}
`
export const main = css`
	html {
		font-family: 'Lato', sans-serif;
	}

	button {
		background-color: #fff;
		border: 1px solid #dcb;
		border-radius: 5px;
		padding: .25em .5em;

		&:not(:disabled) {
			cursor: pointer;

			&:hover {
				background-color: #f7f7f7;
			}
		}
	}

	input {
		border: 1px solid #dcb;
		border-radius: 5px;
		padding: .25em .5em;
	}
`;