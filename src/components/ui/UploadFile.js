import React from 'react';

const UploadFile = () =>{
    
   return(
        <form onSubmit={this.submitFile}>
            <input name="file" type="file"></input>
            <button>Submit</button>
        </form>
   )
}

export default UploadFile;