import { useState, useEffect } from "react";

export function useLocalStorage<T>(key:string, initalValue: T | (()=>T)) {
	
	const [value, setValue] = useState<T>( () => {
		const jsonValue = localStorage.getItem(key);

		// if the item doesnt exist:
		if(jsonValue === null){
			if (typeof initalValue === 'function'){
				return (initalValue as () => T) ()  // we're casting it to a type so that we can tell typescript that its a function and then we are calling it
			}
			else{
				return initalValue
			}
		}
		else{
			return JSON.parse(jsonValue);
		}
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value])
	

	return [value, setValue] as [T, typeof setValue];
}