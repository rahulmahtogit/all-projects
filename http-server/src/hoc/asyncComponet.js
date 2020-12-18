import React, {Component} from 'react'

// importComponet is a function
const asyncComponet = (importComponet)=>{
    return class extends Component {
        state = {
            componet :null }

        componentDidMount(){
            importComponet().then(cmp =>{
                this.setState({componet: cmp.default});
            })
        }
        
        render(){
            const C = this.state.componet
            return C ? <C {...this.props} /> : null ;
        }


    }

}

export default asyncComponet;