import { useState, useMemo, useContext } from "react";
import { ReactGrid, CellChange, TextCell } from "@silevis/reactgrid";
import { getLiquidFunds, getInflows, getOutflows } from "../../constants";
import {
  LiquidFunds,
  Inflows,
  Outflows,
  CashFlowValue
} from "../../types/types-interfaces";
import { getRows, getColumns } from "../../utils/grid-helper";
import CustomHeader from "../../components/custom-header";
import { headerRow } from "../../utils/grid-helper";
import { Stack } from "@mui/material";
import Graph from './Graph';
import "@silevis/reactgrid/styles.css";
import { AppContext } from '../../AppContext';
import '../Style/Stylesheet.css'


const Planner = ({ }) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('AppContext must be used within an AppProvider');
  }
  const { open } = context;
  const [liquidFunds, setLiquidFunds] = useState<LiquidFunds[]>(
    getLiquidFunds()
  );
  const [cashInArray, setCashInArray] = useState<number[]>([]);
  const [cashOutArray, setCashOutArray] = useState<number[]>([]);
  const [inflows, setInflows] = useState<Inflows[]>(getInflows());
  const [outflows, setOutflows] = useState<Outflows[]>(getOutflows());
  const [cashbox, setCashbox] = useState<number[]>([]);
  const columns = useMemo(getColumns, []);
  const [backgroundColor] = useState(localStorage.getItem('bgColor') !== null ? localStorage.getItem('bgColor') : '#137e0c');
  const [color] = useState(localStorage.getItem('fontColor') !== null ? localStorage.getItem('fontColor') : '#f1f1f1');
  const handleFundsChange = (changes: CellChange<TextCell>[]) => {
    changes.forEach((change) => {
      const fundIndex = change.rowId as string;
      const fieldName = change.columnId as string;

      if (fundIndex.startsWith("inflow")) {
        const inflowEntries = Object.entries(inflows[0]);

        inflowEntries.map(([key, values]) => {
          const inflowFund = values.find(
            (item: CashFlowValue) =>
              fundIndex.includes(item.id) && fieldName.includes(item.month)
          );

          if (inflowFund) {
            const newInflows = inflows.map((fund: Inflows) => {
              const newValues = fund[key as keyof Inflows].map(
                (item: CashFlowValue) => {
                  // Add a type assertion to keyof Inflows
                  if (item.id === fundIndex && item.month === fieldName) {
                    return { ...item, value: Number(change.newCell.text) };
                  }
                  return item;
                }
              );

              return { ...fund, [key]: newValues };
            });

            setInflows(newInflows);
          }
        });
      } else if (fundIndex.startsWith("outflow")) {
        const outflowEntries = Object.entries(outflows[0]);

        outflowEntries.map(([key, values]) => {
          const outflowFund = values.find(
            (item: CashFlowValue) =>
              fundIndex.includes(item.id) && fieldName.includes(item.month)
          );

          if (outflowFund) {
            const newOutflows = outflows.map((fund) => {
              const newValues = fund[key as keyof Outflows].map(
                (item: CashFlowValue) => {
                  // Add a type assertion to keyof Outflows
                  if (item.id === fundIndex && item.month === fieldName) {
                    return { ...item, value: Number(change.newCell.text) };
                  }
                  return item;
                }
              );

              return { ...fund, [key]: newValues };
            });

            setOutflows(newOutflows);
          }
        });
      } else {
        const newLiquidFunds = liquidFunds.map((fund) => {
          if (fund.id === fundIndex && fund.month === fieldName) {
            return { ...fund, value: Number(change.newCell.text) };
          }
          return fund;
        });

        setLiquidFunds(newLiquidFunds);
      }
    });
    console.log('Updated inflows', inflows)
    console.log('Updated outflows', outflows)
    console.log('Updated liquidFunds', liquidFunds)
    console.log('Updated cashbox', cashbox)
  };

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


  return (
    <Stack overflow={'hidden'} sx={open ? { width: '85%', marginLeft: '14rem' } : { width: '100%' }}>
      <Graph cashInArray={cashInArray} cashOutArray={cashOutArray} liquidFunds={liquidFunds} />
      <Stack sx={{ overflow: 'scroll' }}>
        <Stack sx={{ width: '100%', marginTop: '2rem' }}>
          <Stack direction={'row'} ml={'12.5rem'}>
            {headerRow.cells.map((cell, index) =>
              (cell as TextCell).text === "" ? (
                <CustomHeader BackgroundColor="White" Color="White" key={index}>
                  {(cell as TextCell)?.text}
                </CustomHeader>
              ) : (
                <CustomHeader
                  BackgroundColor={backgroundColor !== null ? backgroundColor : ''}
                  Color={color !== null ? color :''}
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
          <Stack>
            <ReactGrid
              rows={rows}
              columns={columns}
              stickyRightColumns={1}
              stickyLeftColumns={1}
              onCellsChanged={(changes) =>
                handleFundsChange(changes as CellChange<TextCell>[])
              }
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Planner;
