import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { ToDoList } from "./ToDoList";
//create your first component
export function Home() {
	return (
		<div>
			<ToDoList />
		</div>
	);
}
