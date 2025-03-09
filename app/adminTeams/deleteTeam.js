'use client'

import { useState, useEffect } from 'react'
import React, { Fragment } from 'react';

import Link from 'next/link';
import { useTeam } from '../teamChoice';
import { useRouter } from 'next/navigation';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Admin from "../loggedin/page.js"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Field, Fieldset, Input, Label, Legend, Select, Textarea } from '@headlessui/react'



export default function Delete() {
    const [data, setData] = useState([]);
    const [toDelete, setToDelete] = useState(null);
    const [deletekey, setDeletekey] = useState(null);
    let info_response;

    

    useEffect(() => {
        async function db_query() {
            let query = 'select * from team;';

            try {
                console.log('sending API request to route')//, query)
                const response = await fetch('api/teams', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query })
                });

                if (!response.ok) {
                    console.log('response with error:', response)
                    throw new Error("Error response not ok")
                }
                const result = await response.json();
                //console.log('result:',result)
                if (result.results.length > 0) {
                    setToDelete(result.results[0].id)
                    console.log("Initial teams:", toDelete)
                } else {
                    console.log('initial teams data', result.results);
                }
                setData(result.results);
                console.log('data:', data)
                console.log('result:', result)
            }

            catch {
                //console.error('error catch', Error)
                console.log('problem - need to clean up error deleteTeam')
                console.log('data:', data)
            }
        }

        db_query();
    }, []);

    async function deleteTeam(id) {
        let query = `delete from team where id = "${id}";`
        console.log('query for delete team', query);
        try {
            console.log('sending API request to route')//, query)
            const response = await fetch('api/teams', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
                //intentional error ^^^^^^^^^^^^^^ to block api from working and deleting
            });

            if (!response.ok) {
                console.log('response with error:', response)
                throw new Error("Error response not ok")
            }
            const result = await response.json();
            console.log('result!!!:',result)
            await db_query();

        }

        catch {
            //console.error('error catch', Error)
            console.log('problem - need to clean up error deleteTeam 2')
            console.log('data:', data)
        }

        query = 'select * from team;';

        try {
            console.log('sending API request to route')//, query)
            const response = await fetch('api/teams', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            });

            if (!response.ok) {
                console.log('response with error:', response)
                throw new Error("Error response not ok")
            }
            const result = await response.json();
            //console.log('result:',result)
            if (result.results.length > 0) {
                setToDelete(result.results[0].id)
                console.log("Initial teams:", toDelete)
            } else {
                console.log('initial teams data', result.results);
            }
            setData(result.results);
            console.log('data:', data)
            console.log('result:', result)
        }

        catch {
            //console.error('error catch', Error)
            console.log('problem - need to clean up error last deleteTeam')
            console.log('data:', data)
        }
    }

    const deleteSelect = (event) => {
        const deleteId = event.target.value
        setToDelete(deleteId);
        const key = data.find(item => item.id.toString() === deleteId);
        if (deleteId) {
            setDeletekey(key.sponsor_photo_key)
        }
    }

    return (
        <div className="flex justify-center">

            <Fieldset className="w-4/5 flex-basis:80 pt-4 bg-white  shadow-2xl block px-2 py-2 justify-center rounded-2xl">
                <Legend className="text-lg font-bold bg-primroseYellow text-myrtleGreen justify-center rounded-xl inline-block px-4">Delete Team</Legend>
                <Field>
                    <Label className="block flex justify-center py-2">Choose Team to Delete</Label>
                    <p className="italic block flex justify-center py-2">players on roster will NOT be deleted, only the team</p>
                    <Select
                        className="border border-myrtleGreen px-4 py-1 border-1"
                        onChange={deleteSelect}
                        
                    >
                        {data && data.length > 0 ? (
                            data
                                .filter(item => item !== null && item !== undefined)
                                .map((item, index) => (
                                    <option key={item.id} value={item.id}>{item.team_name}</option>
                                ))) : null
                        };
                    </Select>
                </Field>
                <Field className="pt-4 pb-4">
                    <button
                        type="submit"
                        className="text-lg font-bold bg-primroseYellow text-myrtleGreen px-4 py-2 justify-center rounded-2xl"

                        onClick={() => {
                            deleteTeam(toDelete);
                        }}
                    >DELETE</button>
                </Field>
            </Fieldset>
        </div>
    )
}