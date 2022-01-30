import { MenuIcon, XIcon, UserCircleIcon, UserIcon, BeakerIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';
interface HeaderBarProps {
	name: string;
}

const resources = [
	{
		name: 'My Profile',
		description: 'View/Edit your profile information.',
		route: '/profile',
		icon: UserIcon,
	},
	{
		name: 'Create Cover Letters',
		description: 'Build a cover letter using the available templates on the go.',
		route: '/build',
		icon: BeakerIcon,
	},
];

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

const Logo = () => (
	<div className="flex justify-start lg:w-0 lg:flex-1">
		<a href="#">
			<span className="sr-only">Workflow</span>
			Logo Here
		</a>
	</div>
);

const Menu = () => (
	<Popover.Group as="nav" className="hidden md:flex space-x-10">
		<Link href="/dashboard">
			<a className="text-base font-medium text-gray-500 hover:text-gray-900">Dashboard</a>
		</Link>

		<Link href="/docs">
			<a className="text-base font-medium text-gray-500 hover:text-gray-900">Docs</a>
		</Link>

		<Popover className="relative">
			{({ open }) => (
				<>
					<Popover.Button
						className={classNames(
							open ? 'text-gray-900' : 'text-gray-500',
							'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						)}
					>
						<span>Tools</span>
						<ChevronDownIcon
							className={classNames(
								open ? 'text-gray-600' : 'text-gray-400',
								'ml-2 h-5 w-5 group-hover:text-gray-500'
							)}
							aria-hidden="true"
						/>
					</Popover.Button>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
							<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
								<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
									{resources.map((item) => (
										<Link href={item.route} key={item.name}>
											<a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
												<item.icon
													className="flex-shrink-0 h-6 w-6 text-indigo-600"
													aria-hidden="true"
												/>
												<div className="ml-4">
													<p className="text-base font-medium text-gray-900">{item.name}</p>
													<p className="mt-1 text-sm text-gray-500">{item.description}</p>
												</div>
											</a>
										</Link>
									))}
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	</Popover.Group>
);

const User = ({ name }: HeaderBarProps) => (
	<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
		<UserCircleIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
		<a
			href="#"
			className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
		>
			{name}
		</a>
	</div>
);

const ResponsiveMenu = ({ name }: HeaderBarProps) => (
	<Transition
		as={Fragment}
		enter="duration-200 ease-out"
		enterFrom="opacity-0 scale-95"
		enterTo="opacity-100 scale-100"
		leave="duration-100 ease-in"
		leaveFrom="opacity-100 scale-100"
		leaveTo="opacity-0 scale-95"
	>
		<Popover.Panel
			focus
			className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
		>
			<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
				<div className="pt-5 pb-6 px-5">
					<div className="flex items-center justify-between">
						<div>Logo Here</div>
						<div className="-mr-2">
							<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
								<span className="sr-only">Close menu</span>
								<XIcon className="h-6 w-6" aria-hidden="true" />
							</Popover.Button>
						</div>
					</div>
				</div>
				<div className="py-6 px-5 space-y-6">
					<div className="grid grid-cols-2 gap-y-4 gap-x-8">
						<Link href="/dashboard">
							<a className="text-base font-medium text-gray-900 hover:text-gray-700">Dashboard</a>
						</Link>
						<Link href="/docs">
							<a className="text-base font-medium text-gray-900 hover:text-gray-700">Docs</a>
						</Link>

						{resources.map((item) => (
							<Link key={item.name} href={item.route}>
								<a className="text-base font-medium text-gray-900 hover:text-gray-700">
									{item.name}
								</a>
							</Link>
						))}
					</div>
					<div>
						<p className="mt-6 text-center text-base font-medium text-gray-500">
							{name + ' | '}
							<a href="#" className="text-indigo-600 hover:text-indigo-500">
								Sign Out
							</a>
						</p>
					</div>
				</div>
			</div>
		</Popover.Panel>
	</Transition>
);

const HeaderBar = ({ name }: HeaderBarProps) => {
	return (
		<Popover className="relative bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
					<Logo />
					<div className="-mr-2 -my-2 md:hidden">
						<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
							<span className="sr-only">Open menu</span>
							<MenuIcon className="h-6 w-6" aria-hidden="true" />
						</Popover.Button>
					</div>
					<Menu />
					<User name={name} />
				</div>
			</div>
			<ResponsiveMenu name={name} />
		</Popover>
	);
};

export default HeaderBar;
