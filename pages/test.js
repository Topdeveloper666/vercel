import Global from '../_helpers/global';


function Test({ data }) {

    return (
        <>
            {
                data.map((post) => (
                    <h2>{post.slider_image_base_url}</h2>
                ))
            }
        </>
    )
}

export default Test;



export const getServerSideProps =
    async () => {

        const url = Global.BASE_API_PATH + `/allslider`;
        const res = await fetch(url, {
            headers: {
                Accept: 'application/json',
                method: 'GET',
            },
        });
        const dataslide = await res.json();

        return {
            props: {
                data: dataslide.slider_images
            }
        }
    };


