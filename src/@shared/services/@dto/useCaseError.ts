export interface UsecaseError {
	ok: boolean
	error: {
		errors: {
			context: string
			message: string
			path: string
		}[]
	}
}