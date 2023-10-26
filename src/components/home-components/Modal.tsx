//react
import React, { Dispatch, ReactElement, SetStateAction, cloneElement } from "react";
//styles
//component

type Props = {
	children: ReactElement;
	setOpen: Dispatch<SetStateAction<boolean>>;
	zIndex: number;
	height: string;
};

const Modal: React.FC<Props> = ({ children, setOpen, zIndex, height }) => {
	return (
		<div
			onClick={() => setOpen(false)}
			style={{
				width: "100%",
				height: "100%",
				position: "absolute",
				zIndex: zIndex,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "rgba(12, 11, 14, 0.4)",
				backdropFilter: "blur(4px)",
			}}
		>
			<div style={{ width: "40%", minWidth: "300px", height: height, minHeight: "400px" }} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
