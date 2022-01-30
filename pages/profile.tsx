import type { NextPage } from 'next';
import Layout from 'components/Layout';
import ProfileForm from 'components/ProfileForm';

const ProfilePage: NextPage = () => (
	<Layout>
		<ProfileForm />
	</Layout>
);

export default ProfilePage;
