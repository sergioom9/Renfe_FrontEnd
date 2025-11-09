import Alert from "../components/Alert.tsx";
import Alert2 from "../components/Alert2.tsx";
type Propsdata = {
    message: string;
    error: boolean;
    type: number;
}

const AlertIsland = ({message, error,type}:Propsdata) => {
    if(type===2){
        return (
        <Alert2 message={message} error={error} />
    );
    }else if(type===1){
    return (
        <Alert message={message} error={error} />
    );
}  
}
export default AlertIsland;