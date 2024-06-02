import { styled } from "@mui/material";


interface CustomHeaderProps {
  BackgroundColor: string;
  Color: string;
  Width?: number;
}
const CustomHeader = styled("div")<CustomHeaderProps>(
  ({ BackgroundColor, Color, Width }) => ({
    backgroundColor: BackgroundColor,
    color: Color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    width: "100%",
    minWidth: Width,
    textAlign: "center",
  })
);

export default CustomHeader;
