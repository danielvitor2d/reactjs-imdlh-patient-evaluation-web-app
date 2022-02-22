import React from 'react'
import { Radar } from 'react-chartjs-2'

export default function Chart({ userData }: any) {

  // <block:setup:1>
  const labels = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12']
  const data = {
    labels: labels,
    datasets: [{
        label: '',
        data: userData,
        backgroundColor: 'rgba(3, 91, 80, 0.2)',
        borderColor: 'rgba(3, 91, 80, 0.5)',
        pointBackgroundColor: 'rgba(3, 91, 80)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(3, 91, 80)'
      }]
  };
  // </block:setup>

  return (
    <Radar
      data={data}
      options={{
        responsive: true,
        elements: {
          line: {
            borderWidth: 3,
          }
        },
        scales: {
          r: {
              angleLines: {
                  display: true
              },
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax: 10,
              ticks: {
                stepSize: 1
              },
          },
        }
      }}
    />
  )
}