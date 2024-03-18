import { useState, useCallback } from "react";

/**
 * Custom hook that provides a state value stored in the browser's local storage.
 * If the value does not exist in the local storage, it falls back to the provided defaultValue.
 *
 * @param {string} key - The key used to store the value in the local storage.
 * @param {any} defaultValue - The default value to use if the value does not exist in the local storage.
 * @returns {[any, function]} - A tuple containing the current value and a function to update the value.
 */
const useLocalStorage = (key, defaultValue) => {
	const [localStorageValue, setLocalStorageValue] = useState(() => {
		try {
			const value = localStorage.getItem(key);
			return value ? value : defaultValue;
		} catch (error) {
			return defaultValue;
		}
	});

	const setLocalStorageStateValue = useCallback((valueOrFn) => {
		let newValue;
		if (typeof valueOrFn === "function") {
			const fn = valueOrFn;
			newValue = fn(localStorageValue);
		} else {
			newValue = valueOrFn;
		}
		localStorage.setItem(key, newValue);
		setLocalStorageValue(newValue);
	}, [key, localStorageValue]);

	return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
