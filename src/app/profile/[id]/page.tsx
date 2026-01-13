const Profile = async ({ params }: any) => {
    const resolvedParams = await params;
    console.log(resolvedParams)
    return (
        <>
            <div>Profile</div>
            <div>id:{resolvedParams.id}</div>
        </>
    )
}

export default Profile