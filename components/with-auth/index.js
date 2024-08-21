export function withAuth(Component){
    return function WithAuth(props){
        const isLogin = false;

        if (!isLogin) return <div>Anda harus login!</div>;

        return <Component {...props}/>;
    }
}