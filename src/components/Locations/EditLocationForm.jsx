import React from 'react';

const EditLocationForm = ({ toggEditLocation }) => {

    const submit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
    }

    return (
        <form className='w-[50vw] h-[40vh] flex flex-col gap-4 px-4 font-[inter]' onSubmit={submit}>
            <div className="flex gap-2">
                <img className='w-8 h-8 object-cover rounded-full' src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvbWFuJTIwaGFwcHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="Merchant Image" />
                <select className='rounded-full w-24 text-sm border focus:outline-none py-1 px-2' name="visibility" id="visibility">
                    <option value="merchant">Merchant</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label className='font-semibold text-sm text-slate-600' htmlFor="title">Title/City</label>
                <input className='bg-white outline text-md text-[#9EA6A9]  outline-[#9EA6A9] outline-1 p-1 rounded-lg' name='title' type="text" placeholder='' />
            </div>
            <div className="flex flex-col">
                <label className='font-semibold text-sm text-slate-600' htmlFor="title">Latitude</label>
                <input className='bg-white text-slate-600 outline text-md text-[#9EA6A9]  outline-[#9EA6A9] outline-1 p-1 rounded-lg' name='title' type="text" placeholder='' />
            </div>

            <div className="flex flex-col">
                <label className='font-semibold text-sm text-slate-600' htmlFor="tags">Longitude </label>
                <input className=' bg-white outline text-slate-600  outline-[#9EA6A9] outline-1 p-1 rounded-lg' name='tags' type="text" placeholder='' />
            </div>
            <div className="flex justify-end gap-3">
                <button onClick={toggEditLocation} className='text-xs font-semibold text-slate-600'>Cancel</button>
                <button className='text-xs font-semibold text-white bg-[#2CA568] px-4 py-2 rounded-lg'>Update</button>
            </div>
        </form>
    )
}

export default EditLocationForm;
