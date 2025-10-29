import Alert from "../components/Alert.tsx";

type Propsdata = {
    message: string;
    error: boolean;
}

const AlertIsland = ({message, error}:Propsdata) => {
    return (
        <Alert message={message} error={error} />
    );
}
export default AlertIsland;