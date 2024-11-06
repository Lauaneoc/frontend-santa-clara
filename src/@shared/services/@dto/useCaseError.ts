export interface UsecaseError {
	error: {
		response: {
			data: {
				message: string;
				name: string;
				response: {
					message: string;
					path: string;
				};
				status: number;
			};
		};
	};
}
