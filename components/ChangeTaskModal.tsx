import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog';
import * as React from 'react';
import { View, Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';

interface ChangeTaskModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentTask: string;
    onSelectTask: (task: string) => void;
}

const ALTERNATIVE_TASKS = [
    { id: '1', title: 'Delete 100 screenshots', category: 'Gallery cleanup' },
    { id: '2', title: 'Unsubscribe from 5 newsletters', category: 'Email cleanup' },
    { id: '3', title: 'Organize app folders', category: 'Phone organization' },
];

export function ChangeTaskModal({
    open,
    onOpenChange,
    currentTask,
    onSelectTask,
}: ChangeTaskModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-card rounded-3xl mx-4">
                <DialogHeader className="flex-row items-center justify-between pb-4">
                    <DialogTitle>
                        <Text className="text-xl font-semibold text-foreground">
                            Choose a different task
                        </Text>
                    </DialogTitle>
                    <DialogClose asChild>
                        <Pressable className="w-8 h-8 rounded-full bg-muted items-center justify-center">
                            <Icon as={X} size={16} className="text-muted-foreground" />
                        </Pressable>
                    </DialogClose>
                </DialogHeader>

                <View className="gap-3">
                    {ALTERNATIVE_TASKS.map((task) => (
                        <Pressable
                            key={task.id}
                            onPress={() => {
                                onSelectTask(task.title);
                                onOpenChange(false);
                            }}
                        >
                            <Card className="p-4 bg-muted/50 border-border active:bg-primary/10">
                                <Text className="text-base font-medium text-foreground">
                                    {task.title}
                                </Text>
                                <Text className="text-sm text-muted-foreground mt-1">
                                    {task.category}
                                </Text>
                            </Card>
                        </Pressable>
                    ))}
                </View>

                <View className="pt-4">
                    <Button
                        variant="outline"
                        onPress={() => onOpenChange(false)}
                        className="w-full h-12 rounded-2xl"
                    >
                        <Text className="font-medium text-foreground">Cancel</Text>
                    </Button>
                </View>
            </DialogContent>
        </Dialog>
    );
}
