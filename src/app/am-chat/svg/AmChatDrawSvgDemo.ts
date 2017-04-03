import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from "@angular/core";
import {geometry, Group, Path, Rect, Surface, Text} from "@progress/kendo-drawing";

@Component({
    moduleId: module.id,
    selector: "am-chat-draw-svg",
    template: `
        <div #surface></div>
    `
})
export class AmChatDrawSvgDemo implements AfterViewInit, OnDestroy {
    @ViewChild('surface')
    private surfaceElement: ElementRef;
    private surface: Surface;

    public ngAfterViewInit(): void {
        this.drawScene(this.createSurface());
    }

    public ngOnDestroy() {
        this.surface.destroy();
    }

    private createSurface(): Surface {
        // Obtain a reference to the native DOM element of the wrapper
        const element = this.surfaceElement.nativeElement;

        // Create a drawing surface
        this.surface = Surface.create(element);

        return this.surface;
    }

    drawScene(surface: Surface) {

        const rect = new Rect(
            new geometry.Rect(
                new geometry.Point(50, 40),
                new geometry.Size(100, 100)
            ).bbox(new geometry.Matrix())
        );

        // Create a path and draw a straight line
        const path = new Path({
            stroke: {
                color: `#9999b6`,
                width: 2
            }
        });

        path.moveTo(0, 50).lineTo(200, 50).close();

        // Create the text
        const text = new Text(`Hello World!`, new geometry.Point(20, 25), {
            font: `bold 15px Arial`
        });

        // Place all the shapes in a group
        const group = new Group();
        group.append(path);
        group.append(text);

        // Rotate the group
        group.transform(
            geometry.transform().rotate(-20, [150, 25])
        );

        // Render the group on the surface
        surface.draw(group);
        surface.draw(rect);
    }
}
