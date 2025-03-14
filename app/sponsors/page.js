'use client'

import { useState, useEffect } from 'react'
import React, { Fragment } from 'react';
import Navbar from "../Navbar";


export default function Sponsors() {

    const [data, setData] = useState([]);

    let info_response;
    let query = 'select * from sponsor order by sponsor_level;';

    useEffect(() => {
        async function db_query() {
            try {
                console.log('sending API request to route')//, api_request)
                const response = await fetch('api/sponsor/', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query })
                });

                if (!response.ok) {
                    throw new Error("Error response not ok")
                }
                const result = await response.json();
                //console.log('result:',result)
                setData(result.results);
                console.log('data:', data)
                console.log('result:', result)
            }

            catch {
                //console.error('error catch', Error)
                console.log('problem - need to clean up error catching5')
                console.log('data:', data)
            }
        }

        db_query();
    }, []);

    /*removed table headers
    
    <thead>
                        <tr className="flex flex-wrap flex-auto justify-center text-roseRed">
                            <th>Photo</th>
                            <th>Sponsor</th>
                            <th>Level</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>Bio</th>
                        </tr>
                    </thead>
    
                    */


    return (
        <div>
            <Navbar />
            <h1 className="inline-block text-lg font-bold text-white bg-myrtleGreen justify-center rounded-xl px-3 py-2 mt-2 mb-2 "><strong>Sponsors</strong></h1>
            <div className="flex justify-center items-center">

                <div className="w-4/5 justify-center items-center">

                    <div className="justify-center items-center">
                        {data && data.length > 0 ? (
                            data
                                .filter(item => item !== null && item !== undefined)
                                .map((item, index) => (
                                    <div key={index} className="justify-center border-2 border-myrtleGreen border border-opacity-20 bg-white rounded-xl">
                                        <div className=" justify-center items-center rounded-xl text-myrtleGreen p-2">
                                            <div className="items-center">
                                                {item.sponsor_name ? <h1 className="text-2xl pb-2"><strong>{item.sponsor_name}</strong></h1> : ''}
                                            </div>
                                            <div className="pb-2">
                                                {item.sponsor_level ? <p><strong>{item.sponsor_level}</strong> sponsor</p> : ''}
                                            </div>
                                            <div>
                                                {item.sponsor_address ? <p>{item.sponsor_address}</p> : ''}
                                                {item.sponsor_phone ? <p>{item.sponsor_phone}</p> : ''}
                                            </div>

                                            <div className="pt-2 pb-2">
                                                {item.sponsor_website ?
                                                    <a  href={`${item.sponsor_website}`} target="_blank">View Website</a>

                                                    : ""}
                                            </div>
                                            {item.sponsor_photo ?
                                                <div className="flex justify-center items-center pb-2 pt-2"><img
                                                    src={item.sponsor_photo}
                                                    alt={`$[item.sponsor_name} photo`}
                                                    className="max-w-[200px] max-h-[200px] w-auto h-auto block"
                                                /></div>
                                                : <p> </p>}
                                            {item.sponsor_bio ?
                                                <div className="flex justify-center p-10">{item.sponsor_bio}</div>
                                                : <p> </p>}
                                        </div>
                                    </div>

                                ))
                        ) : (<div>Loading...</div>)}
                    </div>

                </div>
            </div>

        </div>
    )
}
