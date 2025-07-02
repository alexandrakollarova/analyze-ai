import { Command } from 'cmdk'
import { useState } from 'react'
import {
    HomeIcon, FoldersIcon, FolderLockIcon, BriefcaseIcon, PlusIcon, FileTextIcon, TableIcon, UsersIcon, GridIcon, MessageCircleIcon, SearchIcon
} from 'lucide-react'

const items = [
    // Navigation
    { value: 'home', label: 'Home', icon: <HomeIcon className="w-5 h-5" />, group: 'Navigation', action: () => window.location.href = '/' },
    { value: 'all-projects', label: 'All Projects', icon: <FoldersIcon className="w-5 h-5" />, group: 'Navigation', action: () => window.location.href = '/all' },
    { value: 'private-projects', label: 'Private Projects', icon: <FolderLockIcon className="w-5 h-5" />, group: 'Navigation', action: () => window.location.href = '/private' },
    { value: 'shared-with-me', label: 'Shared with Me', icon: <BriefcaseIcon className="w-5 h-5" />, group: 'Navigation', action: () => window.location.href = '/shared' },
    // Create
    { value: 'new-document', label: 'New Document', icon: <FileTextIcon className="w-5 h-5" />, group: 'Create', action: () => window.location.href = '/new-document' },
    { value: 'new-spreadsheet', label: 'New Spreadsheet', icon: <TableIcon className="w-5 h-5" />, group: 'Create', action: () => window.location.href = '/new-spreadsheet' },
    { value: 'new-project', label: 'New Project', icon: <PlusIcon className="w-5 h-5" />, group: 'Create', action: () => window.location.href = '/new-project' },
    { value: 'new-team', label: 'Create New Team', icon: <PlusIcon className="w-5 h-5" />, group: 'Create', action: () => alert('Open create team dialog') },
    // Search
    { value: 'search-projects', label: 'Search Projects', icon: <SearchIcon className="w-5 h-5" />, group: 'Search', action: () => alert('Focus projects search') },
    { value: 'search-teams', label: 'Search Teams', icon: <SearchIcon className="w-5 h-5" />, group: 'Search', action: () => alert('Focus teams search') },
    { value: 'search-docs', label: 'Search Docs', icon: <FileTextIcon className="w-5 h-5" />, group: 'Search', action: () => alert('Focus docs search') },
    // Chat
    { value: 'open-chat', label: 'Open Chat', icon: <MessageCircleIcon className="w-5 h-5" />, group: 'Other', action: () => alert('Open chat') },
]

const groups = [
    { heading: 'Navigation', items: items.filter(i => i.group === 'Navigation') },
    { heading: 'Create', items: items.filter(i => i.group === 'Create') },
    { heading: 'Search', items: items.filter(i => i.group === 'Search') },
    { heading: 'Other', items: items.filter(i => i.group === 'Other') },
]

export default function CommandMenu() {
    const [selection, setSelection] = useState<string | null>(null)
    const [search, setSearch] = useState('')

    // Custom filter for cmdk
    const filter = (value: string, search: string) => {
        const item = items.find(i => i.value === value)
        if (!item) return 0
        const haystack = (item.label).toLowerCase()
        return haystack.includes(search.toLowerCase()) ? 1 : 0
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-gray-100/60 to-gray-200/60 backdrop-blur-sm">
            <Command
                label="What do you need?"
                filter={filter}
                className="w-full max-w-xl rounded-2xl bg-white border border-gray-light shadow-xl overflow-hidden"
            >
                <div className="px-6 pt-6 pb-2">
                    <Command.Input
                        value={search}
                        onValueChange={setSearch}
                        placeholder="What do you need?"
                        className="w-full text-2xl font-light bg-transparent outline-none placeholder-gray-dark"
                        autoFocus
                    />
                </div>
                <div className="border-t border-gray-light" />
                <Command.List className="max-h-96 overflow-y-auto px-2 py-2">
                    <Command.Empty className="px-4 py-3 text-gray text-center">No results found.</Command.Empty>
                    {groups.map(group => (
                        <Command.Group key={group.heading} heading={
                            <div className="px-4 pt-4 pb-1 text-xs font-semibold text-gray-dark uppercase tracking-wide">{group.heading}</div>
                        }>
                            {group.items.map(item => (
                                <Command.Item
                                    key={item.value}
                                    value={item.value}
                                    onSelect={() => {
                                        setSelection(item.value)
                                        item.action()
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base cursor-pointer data-[selected=true]:bg-gray-light data-[selected=true]:shadow-inner transition"
                                >
                                    {item.icon && <span className="text-gray-dark">{item.icon}</span>}
                                    <span className="flex-1">{item.label}</span>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    ))}
                </Command.List>
            </Command>
        </div>
    )
}
