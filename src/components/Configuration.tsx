import { useState, useMemo, useContext } from "react";
import { ReactGrid, TextCell } from "@silevis/reactgrid";
import { getLiquidFunds, getInflows, getOutflows } from "../constants";
import {
    LiquidFunds,
    Inflows,
    Outflows,
} from "../types/types-interfaces";
import { getRows, getColumns } from "../utils/grid-helper";
import CustomHeader from "../components/custom-header";
import { headerRow } from "../utils/grid-helper";
import { Button, Stack, TextField, Typography } from "@mui/material";
import "@silevis/reactgrid/styles.css";
import { AppContext } from '../AppContext';


const Planner = ({ }) => {
    const { open } = useContext(AppContext);
    const [liquidFunds, setLiquidFunds] = useState<LiquidFunds[]>(
        getLiquidFunds()
    );
    const columns = useMemo(getColumns, []);
    const [cashInArray, setCashInArray] = useState<number[]>([]);
    const [cashOutArray, setCashOutArray] = useState<number[]>([]);
    const [inflows, setInflows] = useState<Inflows[]>(getInflows());
    const [outflows, setOutflows] = useState<Outflows[]>(getOutflows());
    const [cashbox, setCashbox] = useState<number[]>([]);
    const [backgroundColor, setBackgroundColor] = useState(localStorage.getItem('bgColor') !== null ? localStorage.getItem('bgColor') : '#137e0c'); // Default white color
    const [fontColor, setFontColor] = useState(localStorage.getItem('fontColor') !== null ? localStorage.getItem('fontColor') : '#f1f1f1'); // Default black color
    const rows = useMemo(
        () =>
            getRows(
                liquidFunds,
                inflows,
                outflows,
                setCashbox,
                setCashInArray,
                setCashOutArray
            ),
        [liquidFunds, inflows, outflows]
    );
    const handleBackgroundColorChange = (event) => {
        const color = event.target.value;
        setBackgroundColor(color);
    };
    const handleFontColorChange = (event) => {
        const color = event.target.value;
        setFontColor(color);
    };
    const saveConfiguration = () => {
        localStorage.setItem('bgColor', backgroundColor);
        localStorage.setItem('fontColor', fontColor);
    }
    const resetConfiguration = () => {
        localStorage.removeItem('bgColor');
        localStorage.removeItem('fontColor');
        setBackgroundColor('#137e0c')
        setFontColor('#f1f1f1')
    }
    return (
        <Stack direction={'row'} spacing={4} marginTop='4rem' marginLeft={open ? '14rem' : '0rem'} display={'flex'} justifyContent={'space-evenly'}>
            <Stack sx={open ? { width: '55%', overflowX: 'auto', marginLeft: '14rem' } : { width: '45%', overflowX: 'auto', marginTop: '4rem' }}>
                <Stack direction={'row'} ml={'12.5rem'} overflow={'hidden'}>
                    {headerRow.cells.map((cell, index) =>
                        (cell as TextCell).text === "" ?
                            (
                                <CustomHeader BackgroundColor="White" Color="White" key={index}>
                                    {(cell as TextCell)?.text}
                                </CustomHeader>
                            ) :
                            (
                                index !== headerRow.cells.length - 1 && <CustomHeader
                                    BackgroundColor={backgroundColor}
                                    Color={fontColor}
                                    key={index}
                                    sx={{
                                        position: "sticky",
                                        right: 0,
                                    }}
                                    Width={index === headerRow.cells.length - 1 ? 200 : 150}
                                >
                                    {(cell as TextCell)?.text}
                                </CustomHeader>
                            )
                    )}
                </Stack>
                <Stack height={'20rem'} overflow={'hidden'}>
                    <ReactGrid
                        rows={rows}
                        columns={columns}
                    />
                </Stack>
            </Stack>
            <Stack boxShadow={'2px 2px 6px 3px #d7d7d6'} borderRadius={3} spacing={6} padding={3} height={'18rem'}>
                <Typography color={'#6a6a6a'} fontSize={'18px'} fontWeight={'600'}>Header Configuration</Typography>
                <Stack spacing={4}>
                    <Stack direction={'row'} spacing={3} display={'flex'} justifyContent={'space-between'}>
                        <Typography color={'#6a6a6a'}>Background Color:</Typography>
                        <Stack direction={'row'} spacing={2}>
                            <input
                                type="color"
                                id="backgroundColor"
                                name="backgroundColor"
                                value={backgroundColor}
                                onChange={handleBackgroundColorChange}
                            />
                            <TextField
                                id="backgroundColorText"
                                variant="standard"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} spacing={3} display={'flex'} justifyContent={'space-between'}>
                        <Typography color={'#6a6a6a'}>Font Color:</Typography>
                        <Stack direction={'row'} spacing={2}>
                            <input
                                type="color"
                                id="fontColor"
                                name="fontColor"
                                value={fontColor}
                                onChange={handleFontColorChange}
                            />
                            <TextField
                                id="fontColorText"
                                variant="standard"
                                value={fontColor}
                                onChange={(e) => setFontColor(e.target.value)}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} spacing={4} display={'flex'} justifyContent={'end'}>
                        <Button
                            sx={{
                                color: '#4231b7',
                                borderColor: '#4231b7',
                                '&:hover': {
                                    color: '#4231b7',
                                    borderColor: '#4231b7',
                                },
                            }}
                            variant="outlined"
                            onClick={() => resetConfiguration()}
                        >
                            Reset
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: '#4231b7',
                                '&:hover': {
                                    backgroundColor: '#4231b7',
                                },
                            }}
                            variant="contained"
                            onClick={() => saveConfiguration()}
                        >
                            Save
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Planner;
