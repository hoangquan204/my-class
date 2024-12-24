import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';

export default function Charts() {
    return (
        <>
            <div>
                <BarChart
                    series={[
                        { data: [35, 44, 24, 34] },
                        { data: [51, 6, 49, 30] },
                        { data: [15, 25, 30, 50] },
                        { data: [60, 50, 15, 25] },
                    ]}
                    height={290}
                    xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
                <Typography className='w-full' align='center' variant='h6'>Revenue table</Typography>
            </div>
            <div className='flex items-center'>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
                    series={[
                        {
                            data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                            showMark: ({ index }) => index % 2 === 0,
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </div>
        </>
    );
}